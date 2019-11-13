const Column = {
    idCounter: 4, // счетчик для ID колонок


    // создаём новую заметку
    process(columnElement) {

        const spanActionAddNote = columnElement.querySelector('[data-action-addNote]');
        spanActionAddNote.addEventListener('click', function (event) {
            // создаем новую заметку
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.setAttribute('draggable', 'true');
            noteElement.setAttribute('data-note-id', Note.idCounter);

            Note.idCounter++;

            // находим контейнер для заметок и в конец ставим новую заметку
            columnElement.querySelector('[data-notes]').append(noteElement);
            Note.process(noteElement);

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

        });

        columnElement.addEventListener('dragover', function () {
            event.preventDefault();
        });

        // перетаскиваем заметку в пустую колонку
        columnElement.addEventListener('drop', function () {
            if (Note.draggede) {
                return columnElement.querySelector('[data-notes]').append(Note.draggede);
            }
        });
    }
};