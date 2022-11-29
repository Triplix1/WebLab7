using System.Collections.Generic;

namespace WebLab7.Models
{
    public interface INotesRepository
    {
        Note Get(string name);
        IEnumerable<Note> GetAll();
        void Add (Note note);
    }
    public class NotesRepository : INotesRepository
    {
        EFNoteContext context;
        public NotesRepository(EFNoteContext context)
        {
            this.context = context;
        }
        public void Add(Note note)
        {
            var tmp = Get(note.Name);
            if (tmp != null)
            {
                tmp.JSONObject = note.JSONObject;
            }
            else
            {
                context.Add(note);
            }            
            context.SaveChanges();
        }

        public Note Get(string name)
        {
            return context.Notes.Find(name);
        }

        public IEnumerable<Note> GetAll()
        {
            return context.Notes;
        }
    }
}
