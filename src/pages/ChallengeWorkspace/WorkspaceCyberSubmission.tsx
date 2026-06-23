import { type ChangeEvent, type CSSProperties, type DragEvent, type RefObject } from 'react'
import logo from '../../assets/logo_v1.png'
import type { CompanyChallenge } from '../../data/companyChallenges'
import {
  CyberIconCert,
  CyberIconDuration,
  CyberIconLevel,
  CyberPipeCloud,
  CyberPipeDemo,
  CyberPipeIntegration,
  CyberPipeMemory,
  CyberPipeModelo,
  CyberPipePrompt,
  CyberPipeTools,
} from './WorkspaceCyberIcons'
import './WorkspaceCyberSubmission.css'

const PIPELINE = [
  { id: 'modelo', label: 'Modelo', Icon: CyberPipeModelo, isDemo: false },
  { id: 'tools', label: 'Herramientas', Icon: CyberPipeTools, isDemo: false },
  { id: 'memory', label: 'Memoria', Icon: CyberPipeMemory, isDemo: false },
  { id: 'prompt', label: 'Prompt del sistema', Icon: CyberPipePrompt, isDemo: false },
  { id: 'integration', label: 'Integración', Icon: CyberPipeIntegration, isDemo: false },
  { id: 'cloud', label: 'Nube', Icon: CyberPipeCloud, isDemo: false },
  { id: 'demo', label: 'Demo funcional', Icon: CyberPipeDemo, isDemo: true },
] as const

const PIPELINE_ACTIVE_INDEX = 4

type Props = {
  challenge: CompanyChallenge
  progressPct: number
  submissionFiles: File[]
  submissionDragging: boolean
  submissionUploading: boolean
  submissionUploadError: string | null
  inscripcionId: string | null
  submissionInputId: string
  submissionInputRef: RefObject<HTMLInputElement | null>
  onSubmissionPick: (e: ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (name: string, lastModified: number) => void
  onDragEnter: (ev: DragEvent<HTMLDivElement>) => void
  onDragOver: (ev: DragEvent<HTMLDivElement>) => void
  onDragLeave: (ev: DragEvent<HTMLDivElement>) => void
  onDrop: (ev: DragEvent<HTMLDivElement>) => void
  onUpload: () => void
}

export function WorkspaceCyberSubmission({
  challenge,
  progressPct,
  submissionFiles,
  submissionDragging,
  submissionUploading,
  submissionUploadError,
  inscripcionId,
  submissionInputId,
  submissionInputRef,
  onSubmissionPick,
  onRemoveFile,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  onUpload,
}: Props) {
  const overviewText = challenge.descriptionSections?.length
    ? challenge.descriptionSections.join(' ')
    : challenge.description

  const displayTitle =
    challenge.id === 'ind-1' ? 'Reto: Crea tu agente de IA' : `Reto: ${challenge.title}`

  return (
    <div className="cw-submission">
      <div className="cw-submission__shell">
        <span className="cw-submission__corner cw-submission__corner--tl" aria-hidden />
        <span className="cw-submission__corner cw-submission__corner--tr" aria-hidden />
        <span className="cw-submission__corner cw-submission__corner--bl" aria-hidden />
        <span className="cw-submission__corner cw-submission__corner--br" aria-hidden />

        <header className="cw-submission__brand">
          <img src={logo} alt="" className="cw-submission__brand-logo" />
          <div>
            <p className="cw-submission__brand-title">RETOS IA</p>
            <p className="cw-submission__brand-sub">Reto activo</p>
          </div>
        </header>

        <div className="cw-submission__grid">
          <aside className="cw-submission__stats cw-submission__box" aria-label="Resumen del reto">
            <div className="cw-submission__stat-row">
              <span className="cw-submission__stat-row-icon">
                <CyberIconLevel />
              </span>
              <span className="cw-submission__stat-row-text">
                Nivel <strong>{challenge.level.toLowerCase()}</strong>
              </span>
            </div>
            <div className="cw-submission__stat-row">
              <span className="cw-submission__stat-row-icon">
                <CyberIconDuration />
              </span>
              <span className="cw-submission__stat-row-text">
                Duración: <strong>{challenge.duration}</strong>
              </span>
            </div>
            <div className="cw-submission__stat-row">
              <span className="cw-submission__stat-row-icon">
                <CyberIconCert />
              </span>
              <span className="cw-submission__stat-row-text">
                <strong>Certificación</strong> al completarlo
              </span>
            </div>
            <div className="cw-submission__stat-row cw-submission__stat-row--progress">
              <div
                className="cw-submission__stat-ring"
                style={{ '--pct': `${progressPct}%` } as CSSProperties}
                aria-hidden
              >
                <span>{progressPct}%</span>
              </div>
              <span className="cw-submission__stat-row-text">
                Tu progreso: <strong>{progressPct}% completado</strong>
              </span>
            </div>
          </aside>

          <section className="cw-submission__main cw-submission__box" aria-labelledby="cw-submission-title">
            <span className="cw-submission__reto-pill">Reto 1</span>
            <h2 id="cw-submission-title" className="cw-submission__title">
              {displayTitle}
            </h2>
            <p className="cw-submission__desc">{overviewText}</p>

            <div className="cw-submission__upload-box" aria-labelledby="cw-submission-upload">
              <h3 id="cw-submission-upload" className="cw-submission__upload-title">
                Entrega intermedia
              </h3>
              <p className="cw-submission__upload-hint">
                Sube tu diagrama (draw.io), documento Word y evidencias del agente.
              </p>

              {!inscripcionId && (
                <p className="cw-submission__error" role="alert">
                  Abre este paso desde <strong>Mi panel → Subir entrega</strong> para vincular tu
                  inscripción.
                </p>
              )}

              <input
                ref={submissionInputRef}
                id={submissionInputId}
                type="file"
                className="cw-submission__sr-only"
                multiple
                accept="*/*"
                aria-label="Seleccionar archivos"
                onChange={onSubmissionPick}
              />

              <div
                className={`cw-submission__drop ${submissionDragging ? 'cw-submission__drop--active' : ''}`}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                role="presentation"
              >
                <p className="cw-submission__drop-text">
                  {submissionFiles.length === 0
                    ? 'No se ha seleccionado ningún archivo'
                    : `${submissionFiles.length} archivo${submissionFiles.length === 1 ? '' : 's'} listo${submissionFiles.length === 1 ? '' : 's'}`}
                </p>
                <div className="cw-submission__drop-actions">
                  <label htmlFor={submissionInputId} className="cw-submission__pick-btn">
                    Elegir archivos
                  </label>
                  <button
                    type="button"
                    className="cw-submission__browse-btn"
                    onClick={() => submissionInputRef.current?.click()}
                  >
                    Abrir explorador
                  </button>
                </div>
              </div>

              {submissionFiles.length > 0 && (
                <ul className="cw-submission__files" aria-label="Archivos seleccionados">
                  {submissionFiles.map((file) => (
                    <li key={`${file.name}-${file.lastModified}-${file.size}`}>
                      <span className="cw-submission__file-name">{file.name}</span>
                      <button
                        type="button"
                        className="cw-submission__file-remove"
                        onClick={() => onRemoveFile(file.name, file.lastModified)}
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="cw-submission__submit-row">
                <button
                  type="button"
                  className="cw-submission__submit-btn"
                  disabled={submissionUploading || !inscripcionId || submissionFiles.length === 0}
                  onClick={onUpload}
                >
                  {submissionUploading ? 'Subiendo…' : 'Subir entrega'}
                </button>
              </div>

              {submissionUploadError && (
                <p className="cw-submission__error" role="alert">
                  {submissionUploadError}
                </p>
              )}
            </div>

            <div className="cw-submission__format-box">
              <p className="cw-submission__format-title">Formato esperado</p>
              <ul className="cw-submission__format-list">
                <li>Diagrama de arquitectura del agente (draw.io o similar).</li>
                <li>Documento Word con descripción, prompt del sistema e integración.</li>
                <li>Evidencias de pruebas o capturas del agente en funcionamiento.</li>
              </ul>
            </div>

            <nav className="cw-submission__pipeline" aria-label="Flujo del agente">
              {PIPELINE.map((step, index) => {
                const isActive = index === PIPELINE_ACTIVE_INDEX
                const isDone = index < PIPELINE_ACTIVE_INDEX
                const { Icon } = step
                return (
                  <span key={step.id} style={{ display: 'contents' }}>
                    {index > 0 && <span className="cw-submission__pipe-arrow" aria-hidden />}
                    <div
                      className={`cw-submission__pipe-step ${isActive ? 'cw-submission__pipe-step--active' : ''} ${isDone ? 'cw-submission__pipe-step--done' : ''} ${step.isDemo ? 'cw-submission__pipe-step--demo' : ''}`}
                    >
                      <span className="cw-submission__pipe-icon">
                        <Icon />
                      </span>
                      <span className="cw-submission__pipe-label">{step.label}</span>
                    </div>
                  </span>
                )
              })}
            </nav>
          </section>
        </div>
      </div>
    </div>
  )
}
