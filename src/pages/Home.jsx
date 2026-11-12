import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import PostCard from '..components/PostCard.jsx'
import Loader from '../components/Loader.jsx'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let cancelled = false
        async function load() {
            setLoading(true)
            const { data, error } = await supabase 
                .from('posts')
                .select('id, created_at, title, upvotes')
                .order('created_at', { ascending: false })
            if (cancelled) return
            if (error) setError(error.message)
            else setPosts(data)
            setLoading(false)
        }
        load()
        return () => {
            cancelled = true 
        }
    }, [])

    return (
        <section>
            <div classname="page-head">
                <h1>The feed</h1>
                <p className="muted">
                    Seahawks, Sonic, SpongeBob, Spider-Man, and CS, all in one place.
                </p>
            </div>

            {loading && <Loader label="Fetching posts..." />}
            {error && <p className="error">Couldn't load posts: {error}</p>}

            {!loading && !error && posts.length === 0 && (
                <div className="empty">
                    <p>No posts yet. Start the first crossover.</p>
                    <Link to="/new" className="btn btn-primary">
                        Create a post
                    </Link>
                </div>
            )}

            {!loading && posts.length > 0 && (
                <ul className="feed">
                    {posts.map((p) => (
                        <PostCard key={p.id} post={p} />
                    ))}
                </ul>
            )}
    </section>
    )
}