<script setup lang="ts">
import { useNotes } from './hooks/useNotes';


const {
  showModal,
  newNote,
  errorMsg,
  showDeleteModal,
  confirmDelete,
  notes,
  addNote,
  removeNote
} = useNotes();



</script>

<template>
  <main>
    <div class="overlay" v-show="showModal">
      <div class="modal">
        <textarea name="note" id="note" cols="15" rows="10" v-model.trim="newNote" maxlength="66" style="resize: none;">
        </textarea>

        <p v-if="errorMsg"> {{ errorMsg }} </p>
        <button @click="addNote">Add Note</button>
        <button class="close" @click="showModal = false, errorMsg = ''">Close</button>
      </div>
    </div>
    <div class="overlay" v-show="showDeleteModal">
      <div class="deleteCard">
        <p class="deleteConfirm">Confirm deleting this note?</p>
        <br>
        <div class="buttonContainer">
          <button class="acceptButton" @click="confirmDelete = true, showDeleteModal = false">YES</button>
          <button class="declineButton" @click="confirmDelete = false, showDeleteModal = false">NO</button>
        </div>
      </div>
    </div>

    <div class="container">
      <header>
        <h1>Notes</h1>
        <button @click="showModal = true">+</button>
      </header>
      <div class="card-container">

        <div class="card" v-for="note in notes" :key="note.id" :style="{ backgroundColor: note.backgroundColor }">
          <div class="tool-box">
            <button class="btn-close" @click="removeNote(note.id)">×</button>
          </div>
          <p class="main-text">{{ note.content }}</p>
          <p class="date">{{ note.date }}</p>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
@import "./style/style.css"
</style>
