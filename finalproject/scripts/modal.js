// modal.js
export function openModal(contentNode, title = 'Details') {
  let backdrop = document.getElementById('modal-backdrop');
  let dialog = document.getElementById('modal-content');
  let modalTitle = document.getElementById('modal-title');

  if(!backdrop){
    backdrop = document.createElement('div');
    backdrop.id = 'modal-backdrop';
    backdrop.className = 'modal-backdrop';
    document.body.appendChild(backdrop);

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.innerHTML = `
      <div id="modal-header" style="display:flex;justify-content:space-between;align-items:center;">
        <h3 id="modal-title">${title}</h3>
        <button id="modal-close" aria-label="Close">✕</button>
      </div>
      <div id="modal-content"></div>
    `;
    backdrop.appendChild(modal);

    document.getElementById('modal-close').addEventListener('click', closeModal);
    backdrop.addEventListener('click',(e)=>{ if(e.target===backdrop) closeModal(); });
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });
    dialog = document.getElementById('modal-content');
    modalTitle = document.getElementById('modal-title');
  }

  modalTitle.textContent = title;
  dialog.innerHTML = '';
  dialog.appendChild(contentNode);
  backdrop.classList.add('show');
}

export function closeModal(){
  const backdrop = document.getElementById('modal-backdrop');
  if(backdrop) backdrop.classList.remove('show');
}
