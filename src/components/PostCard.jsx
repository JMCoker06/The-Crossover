import { Link } from 'react-router-dom'

export function formatTime(iso) {
    return new Date(iso).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: "numeric",
        minute: '2-digit',
    })
}

// Feed card: Shows creation time, title, upvotes
export default function PostCard({ post }) {
    return (
        <li>
            <Link to={'/post/${post.id}'} className="card">
                <div className="card-main">
                    <time dateTime={post.created_at}>{formatTime(post.created_at)}</time>
                    <h2>{post.title}</h2>
                </div>
                <div className="votes" aria-label={`${post.upvotes} upvotes`}>
                    <span aria-hidden="true">▲</span>
                    {post.upvotes}
                </div>
            </Link>
        </li>
    )
}