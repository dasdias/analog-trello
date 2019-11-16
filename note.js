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
            Application.save()
        });
    
        // слушаем события при перетаскивании
        noteElement.addEventListener('dragstart', Note.dragstart );
        noteElement.addEventListener('dragend', Note.dragend );
        noteElement.addEventListener('dragenter', Note.dragenter );
        noteElement.addEventListener('dragover', Note.dragover );
        noteElement.addEventListener('dragleave', Note.dragleave );
        noteElement.addEventListener('drop', Note.drop );
    },

    create(id = null, content = '') {
        // создаем новую заметку
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('draggable', 'true');
        noteElement.textContent = content;

        if (id) {
            noteElement.setAttribute('data-note-id', id);
        } else {
            noteElement.setAttribute('data-note-id', Note.idCounter);
            Note.idCounter++;
        }



        Note.process(noteElement);
        return noteElement;
    },

    // dragStart
    dragstart(event) {
        Note.dragged = this;
        this.classList.add('dragged');
        
        event.stopPropagation();
        
    },

    // dragEnd
    dragend(event) {
        event.stopPropagation();

        Note.dragged = null;
        this.classList.remove('dragged');

        document.querySelectorAll('.note')
                .forEach( x => x.classList.remove('under'));

        Application.save();
    },

    // dragEnter
    dragenter(event) {
        event.stopPropagation();

        if (!Note.dragged ||this === Note.dragged) {
            return;
        }
        this.classList.add('under');
    },

    // dragOver
    dragover(event) {
        event.stopPropagation();
        event.preventDefault();
        if (!Note.dragged ||this === Note.dragged) {
            return;
        }


    },

    // dragLeave
    dragleave(event) {
        event.stopPropagation();

        
        if (!Note.dragged ||this === Note.dragged) {
            return;
        }
        this.classList.remove('under');
    },

    // drop
    drop(event) {
        event.stopPropagation();

        if (!Note.dragged ||this === Note.dragged) {
            return;
        }
        // console.log('drop');
        // если совпадают родители перетаскиваемого элемента
        if (this.parentElement === Note.dragged.parentElement) {
            const note = Array.from(this.parentElement.querySelectorAll('.note'));
            const indexA = note.indexOf(this);
            const indexB = note.indexOf(Note.dragged);

            if (indexA < indexB) {
                this.parentElement.insertBefore(Note.dragged, this);
            } else {
                this.parentElement.insertBefore(Note.dragged, this.nextElementSibling);
            }
        } else {
            // заметку которую перетаскиваем, 
            // вставляем перед элементом над которым находится карточка
            this.parentElement.insertBefore(Note.dragged, this)
        }
    }
};

