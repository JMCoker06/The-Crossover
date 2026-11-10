import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import CreatePost from './pages/CreatePost.jsx'
import PostPage from './pages/PostPage.jsx'
import { isConfigured } from './supabaseClient.js'

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        {!isConfigured && (
          <div className="notice" role="alert">
            <strong>Supabase isn't connected yet.</strong> Copy{' '}
            <code>.env.example</code> to <code>.env</code> and add your project
            URL and anon key, then restart <code>npm run dev</code>.
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="*" element={<p className="empty">Page not found.</p>} />
        </Routes>
      </main>
    </>
  )
}
