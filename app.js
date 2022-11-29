const App = {
    data () {
        return {
            title: "Список задач",
            input: {
                value: "",
                placeholder: "Новая задача"
            },
            notes: [
                {
                    id: 1,
                    title: 'task1',
                    edit: true
                },
                {
                    id: 2,
                    title: 'task2',
                    edit: true
                },
                {
                    id: 3,
                    title: 'task3',
                    edit: true
                },
            ]
        }
    },
    mounted() {
        this.getNotes();
    },
    watch: {
        notes: {
            handler(updatedList) {
                localStorage.setItem('notes', JSON.stringify(updatedList))
            },
            deep: true
        }
    },
    methods: {
        onSubmit() {
            let id = 1
            if (this.notes.length > 0) {
                const lastNotes = this.notes.at(-1)
                id = lastNotes.id + 1
            }
            const note = {
                id: id,
                title: this.input.value,
                edit: true
            }

            this.notes.push(note);
            console.log(this.notes)
            this.input.value = ""
        },
        remove(id) {
            const index = this.noteIndex(id)
            this.notes.splice(index, 1)
        },
        getNotes() {
            const localNotes = localStorage.getItem("notes");
            if (localNotes) {
                this.notes = JSON.parse(localNotes);
            }
        },
        onEditNote(id) {
            const index = this.noteIndex(id)
            this.notes[index].edit = false
        },
        saveTask(id) {
            const index = this.noteIndex(id)
            this.notes[index].edit = true
        },
        editNote(event) {
            const index = this.noteIndex(event.target.dataset.id)
            const note = this.notes[index]
            this.notes[index].title = event.target.value

        },
        noteIndex(id) {
            return this.notes.findIndex(item => item.id === Number(id))
        }
    }
}
Vue.createApp(App).mount('#app')