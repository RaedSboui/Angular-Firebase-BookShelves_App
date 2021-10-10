import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class BooksService {


  books : Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks(){
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks(){
    firebase.database().ref('/books').on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  getSingleBooks(id: number){
    return new Promise<Book>(
      (resolve, rejects) => {
        firebase.database().ref('/books/' +id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            rejects(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book){
    //Delete photo
    if(book.photo){
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        //delete is an asynchronous function
        () => {
          console.log("Photo deleted");
        }
      ).catch(
        (error) => {
          console.log("File not found" + error);
        }
      );
    }
    //Delete book information
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if( bookEl === book ) {
          return true;
        }
        return bookEl;
      }
    );

    this.books.splice(bookIndexToRemove, 1)
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File){
    return new Promise<any>(
      (resolve, rejects) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
                      .child('/Images' + almostUniqueFileName + file.name)
                      .put(file);

        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () =>{
              console.log("Loading...");
            },

            (error) => {
              console.log("Loading error : " + error);
              rejects();
            },

            () => {
              resolve(upload.snapshot.ref.getDownloadURL());
            }
        );
      }
    );
  }

}
