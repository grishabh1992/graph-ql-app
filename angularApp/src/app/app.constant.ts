import { gql } from "apollo-angular";

export const AddNote = gql`
mutation addNote($title: String!) {
  addNote(name: $title) {
    name
    date
  }
}
`;

export const UpdateNote = gql`
mutation updateNote($_id:String!, $title: String!, $date: String!) {
  updateNote(_id: $_id, name: $title, date: $date) {
    _id
    name
    date
  }
}
`;

export const DeleteNote = gql`
mutation deleteNote($_id: String!) {
  deleteNote(_id: $_id) {
    message
  }
}
`;


