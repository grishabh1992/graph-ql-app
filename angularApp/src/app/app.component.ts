import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AddNote, DeleteNote, UpdateNote } from './app.constant';
export interface Note { name: string, _id?: string, date?: string }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  notes: any = [];
  note: Note = { name: '' };
  isEdit: boolean = false;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.getNotes();
  }

  updateNote() {
    let query;
    if (this.isEdit) {
      query = this.apollo.mutate({
        mutation: UpdateNote,
        variables: {
          title: this.note.name,
          _id: this.note._id,
          date: this.note.date
        }
      });
    } else {
      query = this.apollo.mutate({
        mutation: AddNote,
        variables: {
          title: this.note.name
        }
      });
    }
    query.subscribe((a) => {
      this.reset();
      this.getNoteQuery().refetch();
    }, (error) => {
      console.log('Érror', error)
    });
  }

  delete(_id: string) {
    console.log(_id, 'Delete')
    this.apollo.mutate({
      mutation: DeleteNote,
      variables: {
        _id
      }
    }).subscribe((a) => {
      this.getNoteQuery().refetch();
    }, (error) => {
      console.log('Érror', error)
    });
  }

  edit(note: Note) {
    this.isEdit = true;
    this.note = note;
  }

  reset() {
    this.isEdit = false;
    this.note = {
      name: ''
    };
  }

  getNoteQuery() {
    return this.apollo
      .watchQuery({
        query: gql`
      {
        notes {
          _id
          name
          date
        }
      }
    `,
      });
  }
  getNotes() {
    const test = this.getNoteQuery()
      .valueChanges.subscribe((result: any) => {
        console.log(result)
        this.notes = result?.data?.notes;
        // this.loading = result.loading;
        // this.error = result.error;
      });
    console.log(test)
  }
}
