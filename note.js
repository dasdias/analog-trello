const Note = {
    idCounter: 8, // счетчик для ID заметок
    dragged: null, // будет храниться ссылка на элемент который перетаскивают
    
    // по двойному клику редактируем заметку при проподании фокуса
    // отменяем редактирование
    process (noteElement) {
        noteElement.addEventListener('dblclick', function (event) {
            noteElement.setAttribute('contenteditable', 'true');
    
            // отменяем перетаскивание при редактировании
            noteElement.removeAttribute('draggable');
            noteElement.closest('.column').removeAttribute('draggable');
            noteElement.focus();
        });
                
        noteElement.addEventListener('blur', function (event) {
            noteElement.removeAttribute('contenteditable');
    
            // возвращааем перетаскивание при потере фокуса
            noteElement.setAttribute('draggable', 'true');
            noteElement.closest('.column').setAttribute('draggable', 'true');
    
            if (!noteElement.textContent.trim().length) {
                noteElement.remove();
            }
            
        });
    
        // слушаем события при перетаскивании
        noteElement.addEventListener('dragstart', Note.dragstart );
        noteElement.addEventListener('dragend', Note.dragend );
        noteElement.addEventListener('dragenter', Note.dragenter );
        noteElement.addEventListener('dragover', Note.dragover );
        noteElement.addEventListener('dragleave', Note.dragleave );
        noteElement.addEventListener('drop', Note.drop );
    },

    // dragStart
    dragstart(event) {
        Note.draggede = this;
        this.classList.add('dragged');

        event.stopPropagation();
        
    },

    // dragEnd
    dragend(event) {
        Note.draggede = null;
        this.classList.remove('dragged');

        document.querySelectorAll('.note')
                .forEach( x => x.classList.remove('under'));

    },

    // dragEnter
    dragenter(event) {
        this.classList.add('under');
        if (this === Note.draggede) {
            return;
        }
    },

    // dragOver
    dragover(event) {
        event.preventDefault();
        if (this === Note.draggede) {
            return;
        }


    },

    // dragLeave
    dragleave(event) {
        this.classList.remove('under');

        if (this === Note.draggede) {
            return;
        }
    },

    // drop
    drop(event) {
        event.stopPropagation();

        if (this === Note.draggede) {
            return;
        }
        // console.log('drop');
        // если совпадают родители перетаскиваемого элемента
        if (this.parentElement === Note.draggede.parentElement) {
            const note = Array.from(this.parentElement.querySelectorAll('.note'));
            const indexA = note.indexOf(this);
            const indexB = note.indexOf(Note.draggede);

            if (indexA < indexB) {
                this.parentElement.insertBefore(Note.draggede, this);
            } else {
                this.parentElement.insertBefore(Note.draggede, this.nextElementSibling);
            }
        } else {
            // заметку которую перетаскиваем, 
            // вставляем перед элементом над которым находится карточка
            this.parentElement.insertBefore(Note.draggede, this)
        }
    }
};

