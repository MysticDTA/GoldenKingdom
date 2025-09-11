// scripts/scrollReveal.js
import { supabase } from './supabaseClient.js'

document.querySelectorAll('.emotion-scroll button').forEach(button => {
  button.addEventListener('click', () => {
    const emotion = button.dataset.emotion
    filterJournalByEmotion(emotion)
  })
})

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

  // 🌬️ Filter entries by emotion (optional if Supabase already filtered)
  const filtered = data.filter(entry => entry.emotion === emotion)

  filtered.forEach(entry => {
    const div = document.createElement('div')
    div.className = 'entry'
    div.innerHTML = `
      <p>${entry.content}</p>
      <small>${new Date(entry.created_at).toLocaleString()}</small>
    `
    container.appendChild(div)
  })
}
