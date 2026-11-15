import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import type { ProjectTimeline, TimelineStage } from "../../types";
import "../styles/DevelopmentTimeline.css";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short", day: "numeric", year: "numeric", timeZone: "UTC"
});

function dateLabel(stage: TimelineStage) {
  const format = (value: string) => dateFormat.format(new Date(value + "T00:00:00Z"));
  if (stage.startedAt && stage.completedAt) return format(stage.startedAt) + " – " + format(stage.completedAt);
  if (stage.startedAt) return "Started " + format(stage.startedAt);
  if (stage.completedAt) return "Completed " + format(stage.completedAt);
  return "";
}

export const DevelopmentTimelineCard = React.memo(({ timeline }: { timeline: ProjectTimeline }) => {
  const [expanded, setExpanded] = useState<string | null>(
    timeline.stages.find(stage => stage.status === "active")?.id ?? timeline.stages[0]?.id ?? null
  );
  const finished = timeline.stages.every(stage => stage.status === "completed");
  const activeTitles = timeline.stages.filter(stage => stage.status === "active").map(stage => stage.title.replace(/^Phase \d+: /, ""));

  return <div className="development-timeline">
    <div className="milestone-summary">
      <div className="milestone-summary-heading"><strong>Project progress estimate</strong><span>{timeline.overallProgress}%</span></div>
      <progress aria-label="Estimated overall project progress" value={timeline.overallProgress} max={100} />
      <p><strong>{activeTitles.length > 1 ? "Active phases" : "Current phase"}</strong> {activeTitles.join(" and ") || timeline.currentPhase}</p>
      {!finished && <p><strong>Recorded target</strong> {timeline.estimatedCompletion}</p>}
    </div>
    <ol className="milestone-list">
      {timeline.stages.map(stage => {
        const open = expanded === stage.id;
        const date = dateLabel(stage);
        const panelId = "stage-desc-" + stage.id;
        return <li key={stage.id} className="milestone-row" data-status={stage.status}>
          <span className="milestone-marker" aria-hidden="true" />
          <div className="milestone-card">
            <button type="button" className="milestone-toggle" aria-expanded={open} aria-controls={panelId}
              onClick={() => setExpanded(open ? null : stage.id)}>
              <span className="milestone-heading"><strong>{stage.title}</strong><FaChevronDown aria-hidden="true" /></span>
              <span className="milestone-meta">
                <span className="milestone-status">{stage.status === "active" ? "In progress" : stage.status === "completed" ? "Completed" : "Planned"}</span>
                {stage.completionPercentage !== undefined && <span>{stage.completionPercentage}%</span>}
                {date && <span>{date}</span>}
              </span>
              <span className="milestone-description">{stage.description}</span>
            </button>
            <div className="milestone-detail" id={panelId} hidden={!open}>
              {stage.notes && <p>{stage.notes}</p>}
              <dl>
                {stage.deliverables?.length ? <><dt>Deliverables</dt><dd><ul>{stage.deliverables.map(item => <li key={item}>{item}</li>)}</ul></dd></> : null}
                {stage.dependencies?.length ? <><dt>Depends on</dt><dd>{stage.dependencies.join(", ")}</dd></> : null}
                {stage.owner && <><dt>Owner</dt><dd>{stage.owner}</dd></>}
                {stage.priority && <><dt>Priority</dt><dd>{stage.priority}</dd></>}
                {stage.estimatedDuration && <><dt>Estimated duration</dt><dd>{stage.estimatedDuration}</dd></>}
              </dl>
              {stage.lessonsLearned?.length ? <><strong>Lessons learned</strong><ul>{stage.lessonsLearned.map(item => <li key={item}>{item}</li>)}</ul></> : null}
            </div>
          </div>
        </li>;
      })}
    </ol>
  </div>;
});

DevelopmentTimelineCard.displayName = "DevelopmentTimelineCard";
export default DevelopmentTimelineCard;
