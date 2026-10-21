document.addEventListener('DOMContentLoaded', () => {
  const progressFill = document.querySelector('.progress-fill');
  const progressThumb = document.querySelector('.progress-thumb');
  const volumeFill = document.querySelector('.volume-fill');
  const percentEl = document.querySelector('.volume-box .percent');
  const playButton = document.querySelector('.transport-btn.primary');
  const timeCurrent = document.querySelector('.time-row .current');
  const timeTotal = document.querySelector('.time-row .total');

  const state = {
    progress: 0,
    volume: 0.6,
    playing: false,
    duration: 222
  };

  const formatTime = (seconds) => {
    const safe = Math.max(0, Math.floor(seconds));
    const min = String(Math.floor(safe / 60)).padStart(1, '0');
    const sec = String(safe % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const updateProgress = () => {
    const clamped = Math.min(Math.max(state.progress, 0), 100);
    progressFill.style.width = `${clamped}%`;
    progressThumb.style.left = `${clamped}%`;

    const elapsed = (clamped / 100) * state.duration;
    timeCurrent.textContent = formatTime(elapsed);
    timeTotal.textContent = formatTime(state.duration);
  };

  const updateVolume = () => {
    const height = state.volume * 100;
    volumeFill.style.height = `${height}%`;
    percentEl.textContent = `${Math.round(state.volume * 100)}%`;
  };

  playButton?.addEventListener('click', () => {
    state.playing = !state.playing;
    playButton.classList.toggle('is-paused', state.playing);
    playButton.innerHTML = state.playing ? '<span class="icon">❚❚</span>' : '<span class="icon">▶</span>';
  });

  document.querySelectorAll('.transport-btn').forEach((button) => {
    button.addEventListener('click', () => {
      if (!button.classList.contains('primary')) {
        button.classList.toggle('active');
      }
    });
  });

  const handleProgressDrag = (clientX) => {
    const track = document.querySelector('.progress-track');
    const rect = track.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    state.progress = Math.min(Math.max(ratio * 100, 0), 100);
    updateProgress();
  };

  document.querySelector('.progress-track').addEventListener('pointerdown', (event) => {
    handleProgressDrag(event.clientX);
    const move = (moveEvent) => handleProgressDrag(moveEvent.clientX);
    const stop = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
  });

  document.querySelector('.volume-stack').addEventListener('click', (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = 1 - (event.clientY - rect.top) / rect.height;
    state.volume = Math.min(Math.max(ratio, 0), 1);
    updateVolume();
  });

  updateProgress();
  updateVolume();
});
