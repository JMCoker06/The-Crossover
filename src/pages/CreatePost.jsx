import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'

export default function CreatePost() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', body: '', image_url: '' })
  const [titleError, setTitleError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [saving, setSaving] = useState(false)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')

    if (!form.title.trim()) {
      setTitleError('A post needs a title.')
      return
    }
    setTitleError('')
    setSaving(true)

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: form.title.trim(),
        body: form.body.trim() || null,
        image_url: form.image_url.trim() || null,
      })
      .select('id')
      .single()

    setSaving(false)
    if (error) {
      setSubmitError(error.message)
      return
    }
    navigate(`/post/${data.id}`)
  }

  return (
    <section className="narrow">
      <div className="page-head">
        <h1>New post</h1>
      </div>

      <form onSubmit={handleSubmit} className="form" noValidate>
        <label>
          <span>
            Title <em className="req">required</em>
          </span>
          <input
            name="title"
            value={form.title}
            onChange={update}
            placeholder="Could Sonic outrun a kick returner?"
            aria-invalid={Boolean(titleError)}
            maxLength={150}
          />
          {titleError && <small className="error">{titleError}</small>}
        </label>

        <label>
          <span>Content</span>
          <textarea
            name="body"
            value={form.body}
            onChange={update}
            rows={6}
            placeholder="Say more… (optional)"
          />
        </label>

        <label>
          <span>Image URL</span>
          <input
            name="image_url"
            type="url"
            value={form.image_url}
            onChange={update}
            placeholder="https://example.com/image.png (optional)"
          />
        </label>

        {submitError && <p className="error">{submitError}</p>}

        <div className="form-actions">
          <button className="btn btn-primary" disabled={saving}>
            {saving ? 'Posting…' : 'Post it'}
          </button>
        </div>
      </form>
    </section>
  )
}