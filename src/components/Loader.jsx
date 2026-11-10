export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="ring" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}