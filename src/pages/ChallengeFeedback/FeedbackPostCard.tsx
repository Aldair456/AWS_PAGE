import type { ChallengeFeedbackPost } from '../../data/challengeFeedback'
import './ChallengeFeedbackPage.css'

type FeedbackPostCardProps = {
  post: ChallengeFeedbackPost
}

export function FeedbackPostCard({ post }: FeedbackPostCardProps) {
  const hasVideo = post.media.some((item) => item.type === 'video')
  const hasImage = post.media.some((item) => item.type === 'image')

  return (
    <article className="feedback-post">
      <header className="feedback-post__header">
        <span
          className="feedback-post__avatar"
          style={{ backgroundColor: post.student.avatarColor }}
          aria-hidden
        >
          {post.student.initials}
        </span>
        <div className="feedback-post__author">
          <h3 className="feedback-post__name">{post.student.name}</h3>
          <p className="feedback-post__meta">
            {post.student.university} · {post.student.role}
          </p>
        </div>
        <time className="feedback-post__date" dateTime={post.postedAt}>
          {post.postedAt}
        </time>
      </header>

      <h4 className="feedback-post__title">{post.title}</h4>
      <p className="feedback-post__summary">{post.summary}</p>
      <p className="feedback-post__body">{post.body}</p>

      {post.media.length > 0 && (
        <div className="feedback-post__media">
          {post.media.map((item, index) =>
            item.type === 'image' ? (
              <figure key={`${post.id}-img-${index}`} className="feedback-post__figure">
                <img src={item.src} alt={item.alt} loading="lazy" />
                {item.caption && <figcaption>{item.caption}</figcaption>}
              </figure>
            ) : (
              <figure
                key={`${post.id}-vid-${index}`}
                className="feedback-post__figure feedback-post__figure--video"
              >
                {item.youtubeId ? (
                  <div className="feedback-post__youtube-wrap">
                    <iframe
                      className="feedback-post__youtube"
                      src={`https://www.youtube.com/embed/${item.youtubeId}`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video controls preload="metadata" poster={item.poster}>
                    {item.src && <source src={item.src} />}
                    Tu navegador no reproduce video HTML5.
                  </video>
                )}
                <figcaption>
                  {item.title}
                  {item.duration ? ` · ${item.duration}` : ''}
                </figcaption>
              </figure>
            ),
          )}
        </div>
      )}

      <ul className="feedback-post__tags" aria-label="Etiquetas">
        {post.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
        {hasVideo && <li className="feedback-post__tag--media">Video</li>}
        {hasImage && <li className="feedback-post__tag--media">Imágenes</li>}
      </ul>

      <footer className="feedback-post__footer">
        <button type="button" className="feedback-post__helpful">
          Útil ({post.helpfulCount})
        </button>
        <span className="feedback-post__comments">{post.commentCount} comentarios</span>
      </footer>
    </article>
  )
}
