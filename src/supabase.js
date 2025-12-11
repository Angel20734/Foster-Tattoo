import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ohdnqwuzvyiwlayrzsev.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZG5xd3V6dnlpd2xheXJ6c2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMjMyMzcsImV4cCI6MjA4MDg5OTIzN30.l502pmFelgAmXoljWJ2gvg0TdC2fgsWvWPWlPx-hnkY"

export const supabase = createClient(supabaseUrl, supabaseKey)
