// scripts/sanctuary.js

// 🔐 Supabase Client Setup
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = https://nusmpqkhjkehiikghhxg.supabase.co
const SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51c21wcWtoamtlaGlpa2doaHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NzQ1NDEsImV4cCI6MjA3MzE1MDU0MX0.mqCZGJS3JdD33-9Sxh_5bQJnbnxl9hpfR9_sVdX7MOs
B95HKTJgc9NsQHBr

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// 🔁 Emotion Scroll Listener
document.querySelectorAll('.emotion-scroll button').forEach(button => {
  button.addEventListener('click', () => {
    const emotion = button.dataset.emotion
    filterJournalByEmotion(emotion)
  })
})

// 🌬️ Filter and Render Soul Journal Entries
async function filterJournalByEmotion(emotion) {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('emotion', emotion)

  if (error) {
    console.error('Supabase error:', error)
    return
  }

  const container = document.getElementById('journal-entries')
  container.innerHTML = ''

  data.forEach(entry => {
    const div = document.createElement('div')
    div.className = `entry ${entry.emotion}` // adds emotion class for styling
    div.innerHTML = `
      <p>${entry.content}</p>
      <small>${new Date(entry.created_at).toLocaleString()}</small>
    `
    container.appendChild(div)
  })
}
