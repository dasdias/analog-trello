// находим все колонки с заметками и для каждой запускаем функцию columnProcess
// document.querySelectorAll('.column').forEach(Column.process);
Application.load();

// находим все заметки и для каждой заметки вызываем функцию Note.process
// document.querySelectorAll('.note').forEach(Note.process);


// находим кнопку добавления новой колонки с заметками и при клике на ней создаём новую
document.querySelector('[data-action-addColumn]')
    .addEventListener('click', function (event) {
        const columnElement = Column.create();

        // контейнер для колонок и вставляем в него новую колонку с заметками
        document.querySelector('.columns').append(columnElement);

        Application.save();
    });