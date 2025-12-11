import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar";

export default function Designs() {
  const [file, setFile] = useState(null);
  const [style, setStyle] = useState("");
  const [artist, setArtist] = useState("");

  const [designs, setDesigns] = useState([]);
  const [modalImg, setModalImg] = useState(null); // zoom
  const [editingId, setEditingId] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  const loadDesigns = async () => {
    const { data, error } = await supabase
      .from("designs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setDesigns(data || []);
  };

  useEffect(() => {
    loadDesigns();
  }, []);

  const uploadDesign = async () => {
    if (!file) {
      alert("Seleccione una imagen");
      return;
    }

    try {
      const fileName = `${Date.now()}-${file.name}`;

      // 1. Subir al bucket "designs"
      const { error: storageError } = await supabase.storage
        .from("designs")
        .upload(fileName, file, {
          contentType: file.type,
          upsert: true,
        });

      if (storageError) {
        console.error(storageError);
        alert("Error al subir imagen");
        return;
      }

      // 2. Obtener URL pública
      const { data: publicData } = supabase.storage
        .from("designs")
        .getPublicUrl(fileName);

      const imageUrl = publicData.publicUrl;

      // 3. Insertar registro en la tabla "designs"
      const { error: insertError } = await supabase.from("designs").insert({
        image_url: imageUrl,
        style: style || null,
        artist: artist || null,
        description: "Diseño subido desde panel admin",
      });

      if (insertError) {
        console.error(insertError);
        alert("Error al guardar en la tabla");
        return;
      }

      // 4. Limpiar formulario y recargar
      setFile(null);
      setStyle("");
      setArtist("");
      loadDesigns();
      alert("Diseño subido correctamente ✅");
    } catch (e) {
      console.error(e);
      alert("Ocurrió un error inesperado");
    }
  };

  const deleteDesign = async (id, imageUrl) => {
    if (!confirm("¿Eliminar este diseño?")) return;

    try {
      // Borrar archivo del storage
      if (imageUrl) {
        const fileName = imageUrl.split("/").pop();
        await supabase.storage.from("designs").remove([fileName]);
      }

      // Borrar registro de la tabla
      const { error } = await supabase
        .from("designs")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(error);
        alert("Error al eliminar diseño");
        return;
      }

      loadDesigns();
    } catch (e) {
      console.error(e);
      alert("Ocurrió un error al eliminar");
    }
  };

  const startEditing = (design) => {
    setEditingId(design.id);
    setNewDescription(design.description || "");
  };

  const updateDescription = async (id) => {
    const { error } = await supabase
      .from("designs")
      .update({ description: newDescription })
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Error al actualizar descripción");
      return;
    }

    setEditingId(null);
    setNewDescription("");
    loadDesigns();
  };

  return (
    <>
      

      {/* FORMULARIO DE SUBIDA */}
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Subir Diseño</h1>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-3"
        />

        <button
          onClick={uploadDesign}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Subir
        </button>

        <div className="form-group">
          <label className="form-label">Estilo del tatuaje</label>
          <input
            className="form-input"
            placeholder="Ej: realismo, linework, anime..."
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Artista</label>
          <input
            className="form-input"
            placeholder="Ej: Foster NK"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Diseños</h2>

        <div className="design-gallery">
  {designs.map((d) => (
    <div key={d.id} className="design-card">
      <div className="design-img-container">
        <img
          src={d.image_url}
          onClick={() => setModalImg(d.image_url)}
          className="design-img"
        />
      </div>

      <div className="design-info">
        <p><strong>Estilo:</strong> {d.style || "—"}</p>
        <p><strong>Artista:</strong> {d.artist || "—"}</p>

        {editingId === d.id ? (
          <div className="mt-2">
            <input
              className="edit-input"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button
              onClick={() => updateDescription(d.id)}
              className="btn-save"
            >
              Guardar
            </button>
          </div>
        ) : (
          <>
            <p className="desc">{d.description || "Sin descripción"}</p>
            <button
              onClick={() => startEditing(d)}
              className="btn-edit"
            >
              Editar descripción
            </button>
          </>
        )}

        <button
          onClick={() => deleteDesign(d.id, d.image_url)}
          className="btn-delete"
        >
          Eliminar
        </button>
      </div>
    </div>
  ))}
</div>

      </div>

      {/* LIGHTBOX PARA ZOOM */}
      {modalImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
          onClick={() => setModalImg(null)}
        >
          <img src={modalImg} className="max-w-[90%] max-h-[90%] rounded" />
        </div>
      )}
    </>
  );
}
