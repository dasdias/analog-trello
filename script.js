// находим все колонки с заметками и для каждой запускаем функцию columnProcess
document.querySelectorAll('.column').forEach(Column.process);

// находим кнопку добавления новой колонки с заметками и при клике на ней создаём новую
document.querySelector('[data-action-addColumn]')
    .addEventListener('click', function(event) {
        const columnElement = document.createElement('div');
        columnElement.classList.add('column');
        columnElement.setAttribute('draggable', 'true');
        columnElement.setAttribute('data-column-id', Column.idCounter);

        columnElement.innerHTML = 
        `<p class="column-header" contenteditable="true">В плане</p>
        <div data-notes></div>
        <p class="column-footer">
            <span data-action-addNote class="action">+ Добавить карточку</span>
        </p>`;

        Column.idCounter++;

        // контейнер для колонок и вставляем в него новую колонку с заметками
        document.querySelector('.columns').append(columnElement);

        // чтобы в новой колонке можно было создавать новые заметки, запускаем функцию Column.process
        Column.process(columnElement);

    });

// находим все заметки и для каждой заметки вызываем функцию Note.process
document.querySelectorAll('.note').forEach(Note.process);




    