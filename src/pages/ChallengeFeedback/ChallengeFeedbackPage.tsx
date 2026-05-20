import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getCareerProfile } from '../../data/careerProfiles'
import { getChallengeById, getChallengesForCareer } from '../../data/companyChallenges'
import { getFeedbackPostsForChallenge } from '../../data/challengeFeedback'
import { FeedbackPostCard } from './FeedbackPostCard'
import './ChallengeFeedbackPage.css'

type FilterId = 'all' | 'video' | 'images' | 'text'

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Todas las entregas' },
  { id: 'video', label: 'Con video' },
  { id: 'images', label: 'Con imágenes' },
  { id: 'text', label: 'Solo texto' },
]

export function ChallengeFeedbackPage() {
  const { careerId, challengeId } = useParams<{ careerId: string; challengeId: string }>()
  const [filter, setFilter] = useState<FilterId>('all')

  const profile = getCareerProfile(careerId)
  const challenge = challengeId ? getChallengeById(challengeId) : undefined
  const careerChallenges = profile ? getChallengesForCareer(profile.id) : []
  const challengeInCareer = challenge && careerChallenges.some((c) => c.id === challenge.id)

  const allPosts = useMemo(
    () => (challengeId ? getFeedbackPostsForChallenge(challengeId) : []),
    [challengeId],
  )

  const posts = useMemo(() => {
    return allPosts.filter((post) => {
      if (filter === 'all') return true
      if (filter === 'video') return post.media.some((m) => m.type === 'video')
      if (filter === 'images') return post.media.some((m) => m.type === 'image')
      return post.media.length === 0
    })
  }, [allPosts, filter])

  if (!profile || !challenge || !challengeInCareer) {
    return <Navigate to="/estudiante/panel" replace />
  }

  const detailPath = `/estudiante/carrera/${profile.id}/reto/${challenge.id}`
  const workspacePath = `${detailPath}/aprender`

  return (
    <div className="challenge-feedback">
      <header className="challenge-feedback__topbar">
        <Link to={workspacePath} className="challenge-feedback__back">
          ← Volver al reto
        </Link>
        <Link to={detailPath} className="challenge-feedback__back challenge-feedback__back--muted">
          Guía del reto
        </Link>
      </header>

      <header className="challenge-feedback__hero">
        <div className="challenge-feedback__hero-inner">
          <p className="challenge-feedback__eyebrow">Comunidad del reto</p>
          <h1 className="challenge-feedback__title">Retroalimentación entre estudiantes</h1>
          <p className="challenge-feedback__subtitle">{challenge.title}</p>
          <span className="challenge-feedback__hero-line" aria-hidden />
          <p className="challenge-feedback__intro">
            Explora cómo otros estudiantes resolvieron este reto: arquitecturas de agentes,
            configuraciones en Agent Builder, diagramas cloud, demos en video y comentarios. Inspírate
            y comparte tu enfoque.
          </p>
        </div>
      </header>

      <div className="challenge-feedback__layout">
        <aside className="challenge-feedback__aside" aria-label="Filtros">
          <p className="challenge-feedback__aside-title">Filtrar entregas</p>
          <ul className="challenge-feedback__filters">
            {FILTERS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`challenge-feedback__filter ${filter === item.id ? 'challenge-feedback__filter--active' : ''}`}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                  <span className="challenge-feedback__filter-count">
                    {item.id === 'all'
                      ? allPosts.length
                      : allPosts.filter((post) => {
                          if (item.id === 'video') return post.media.some((m) => m.type === 'video')
                          if (item.id === 'images') return post.media.some((m) => m.type === 'image')
                          return post.media.length === 0
                        }).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="challenge-feedback__aside-hint">
            {allPosts.length} estudiantes compartieron su solución en este reto.
          </p>
        </aside>

        <main className="challenge-feedback__feed">
          {posts.length === 0 ? (
            <p className="challenge-feedback__empty">No hay entregas con este filtro todavía.</p>
          ) : (
            posts.map((post) => <FeedbackPostCard key={post.id} post={post} />)
          )}
        </main>
      </div>
    </div>
  )
}
