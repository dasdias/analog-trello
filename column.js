const Column = {
    
    // счетчик для ID колонок
    idCounter: 4,
    // здесь будет храниться колонка которую перетаскиваем
    dragged: null,
    dropped: null,


    // создаём новую заметку
    process(columnElement) {

        const spanActionAddNote = columnElement.querySelector('[data-action-addNote]');
        spanActionAddNote.addEventListener('click', function (event) {
            // создаем новую заметку
            const noteElement = Note.create();
            

            // находим контейнер для заметок и в конец ставим новую заметку
            columnElement.querySelector('[data-notes]').append(noteElement);

            // переводим в режим редактирования, созданную новую заметку
            noteElement.setAttribute('contenteditable', 'true');
            noteElement.focus();

        });

        // редактируем заголовок по двойному клику
        const headerElement = columnElement.querySelector('.column-header');
        headerElement.addEventListener('dblclick', function (event) {
            headerElement.setAttribute('contenteditable', 'true');
            headerElement.focus();
        });
        
        // отменяем редактирование заголовка при потере фокуса
        headerElement.addEventListener('blur', function (event) {
            headerElement.removeAttribute('contenteditable');
            Application.save();
            
        });

        columnElement.addEventListener('dragstart', Column.dragstart);
        columnElement.addEventListener('dragend', Column.dragend);

        // columnElement.addEventListener('dragenter', Column.dragenter);
        columnElement.addEventListener('dragover', Column.dragover);
        // columnElement.addEventListener('dragleave', Column.dragleave);

        columnElement.addEventListener('drop', Column.drop);
    },

    create(id = null, title = 'В плане') {

        // создаем новую колонку
         const columnElement = document.createElement('div');
         columnElement.classList.add('column');
         columnElement.setAttribute('draggable', 'true');

         if (id) {
             columnElement.setAttribute('data-column-id', id);
         } else {
             columnElement.setAttribute('data-column-id', Column.idCounter);
             Column.idCounter++;
         }

         columnElement.innerHTML =
             `<p class="column-header" contenteditable="true">${title}</p>
        <div data-notes></div>
        <p class="column-footer">
            <span data-action-addNote class="action">+ Добавить карточку</span>
        </p>`;

        // чтобы в новой колонке можно было создавать новые заметки, запускаем функцию Column.process
         Column.process(columnElement);

         return columnElement;
    },
    dragstart(event) {
        Column.dragged = this;
        Column.dragged.classList.add('dragged');

        event.stopPropagation();

        // при перетаскивании колонки отменяем перетаскивание у заметок
        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.removeAttribute('draggable'));

    },
    dragend(event) {
        Column.dragged.classList.remove('dragged');
        Column.dragged = null;
        Column.dropped = null;

        // при отпускнии колонки возвращаем перетаскивание у заметок
        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.setAttribute('draggable', true));

        // При окончании перетаскивания у колонок убираем класс "under"
        document
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'));
        Application.save();

    },

    // dragenter(event) {
    //     if (!Column.dragged || Column.dragged === this) {
    //         return;
    //     }
    //     this.classList.add('under');
        
    // },
    dragover(event) {
        event.preventDefault();
        event.stopPropagation();

        if (Column.dragged === this) {
            if (Column.dropped) {
                Column.dropped.classList.remove('under');
            }
            Column.dropped = null;
        }

        if (!Column.dragged || Column.dragged === this) {
            return;
        }

        Column.dropped = this;

        document
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'));

        this.classList.add('under');

    },
    // dragleave(event) {
    //     if (!Column.dragged || Column.dragged === this) {
    //         return;
    //     }
    //     this.classList.remove('under');
        
    // },

    // dragover (event) {
    //     event.preventDefault();
    // },

    // перетаскиваем заметку в пустую колонку
    drop() {
        if (Note.dragged) {
            return this.querySelector('[data-notes]').append(Note.dragged);
        }
        else if (Column.dragged) {
            const children = Array.from(document.querySelector('.columns').children);
            const indexA = children.indexOf(this);
            const indexB = children.indexOf(Column.dragged);
            
            if (indexA < indexB) {
                document.querySelector('.columns').insertBefore(Column.dragged, this);
            }
            else {
                document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling);
                
            }
            document
                .querySelectorAll('.column')
                .forEach(columnElement => columnElement.classList.remove('under'));
        }
    }
};