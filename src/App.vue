<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Note } from './Note';
import { watch } from 'vue';



let showModal = ref(false)

let newNote = ref('')

let errorMsg = ref('');

let showDeleteModal = ref(false)

let confirmDelete = ref(false)

let notes = ref<Note[]>([]);

// 组件挂载时从localStorage中获取数据
onMounted(() => {
  const notesFromLocalStorage = localStorage.getItem('notes')
  if (notesFromLocalStorage) {
    notes.value = JSON.parse(notesFromLocalStorage)
  }
})



function addNote() {
  if (newNote.value.length < 5) {
    return errorMsg.value = 'Note must be at least 5 characters long'
  }
  notes.value.push({
    id: Math.floor(Math.random() * 100000000),
    content: newNote.value,
    date: formatDate(new Date()),
    backgroundColor: getLightRandomColor()
  })
  // 将数据存储到localStorage中
  localStorage.setItem('notes', JSON.stringify(notes.value))

  errorMsg.value = ''
  // 清空输入框
  newNote.value = ''
  // 关闭Modal
  showModal.value = false
}

function removeNote(id: number) {
  showDeleteModal.value = true
  watch(showDeleteModal, (newValue) => {
    if (!newValue) {
      // 关闭删除卡牌后进行判断是否需要删除
      if (confirmDelete.value) {
        notes.value = notes.value.filter((note) => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes.value));
      } else {
        return;
      }
    }
  });
}

// 生成随机浅色背景颜色
function getLightRandomColor() {
  var r = Math.floor(Math.random() * 150 + 100); // 控制红色分量在较大范围内
  var g = Math.floor(Math.random() * 150 + 100); // 控制绿色分量在较大范围内
  var b = Math.floor(Math.random() * 150 + 100); // 控制蓝色分量在较大范围内
  var color = 'rgb(' + r + ',' + g + ',' + b + ')';
  return color;
}

// 格式化时间
function formatDate(date: Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${month}/${day}/${year}`;
};

// 监听输入框内容
watch(newNote, (newNote) => {
  console.log(newNote);
  if (newNote.length >= 5) {
    errorMsg.value = ''; // 使用 errorMsg.value 来修改变量的值
  }
});



</script>

<template>
  <main>
    <div class="overlay" v-show="showModal">
      <div class="modal">
        <textarea name="note" id="note" cols="30" rows="10" v-model.trim="newNote" maxlength="66"
          style="font-size: 32px;"></textarea>
        <p v-if="errorMsg"> {{ errorMsg }} </p>
        <button @click="addNote">Add Note</button>
        <button class="close" @click="showModal = false, errorMsg = ''">Close</button>
      </div>
    </div>
    <div class="overlay" v-show="showDeleteModal">
      <div class="deleteCard">
        <p class="cookieHeading">Confirm deleting this note?</p>
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
main {
  height: 100vh;
  width: 100vw;
}

.container {
  max-width: 1000px;
  padding: 10px;
  margin: 0 auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  font-size: 75px;
  font-weight: bold;
  margin-bottom: 25px;
}

header button {
  border: none;
  padding: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: rgb(21, 20, 20);
  font-size: 20px;
  border-radius: 100%;
  color: white;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  position: relative;
  /* 将 card 设置为相对定位 */
  width: 225px;
  height: 225px;
  background-color: rgb(237, 182, 44);
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 30px;
  margin-bottom: 20px;
}

.main-text {
  word-wrap: break-word;
  /* 实现文本超出时换行 */
  margin-top: 2px;
  font-size: 20px;
}

.date {
  font-size: 12.5px;
  font-weight: bold;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.77);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 750px;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modal button {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 5px;
  margin-top: 20px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  outline: none;
  display: inline-block;
  font-weight: bold;
  transition-duration: 0.4s;
  border: 2px solid rgb(21, 20, 20);
  color: rgb(21, 20, 20);
  border-radius: 10px;
  background-color: antiquewhite;
}

.modal .close {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  outline: none;
  display: inline-block;
  font-weight: bold;
  transition-duration: 0.4s;
  border: 2px solid rgb(21, 20, 20);
  color: rgb(21, 20, 20);
  border-radius: 10px;
  background-color: darkgrey;
}

.modal p {
  color: red;
}


.card .btn-close {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: .8rem;
  height: .8rem;
  color: transparent;
  font-size: 0;
  cursor: pointer;
  background-color: wheat;
  border: none;
  border-radius: 100px;
  transition: .2s ease all;
}

.card .btn-close:hover {
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  color: #ffffff;
  background-color: #ff0000cc;
  box-shadow: var(--shadow-active);
}

.card .btn-close:active {
  width: .9rem;
  height: .9rem;
  font-size: .9rem;
  color: #ffffffde;
  --shadow-btn-close: 0 3px 3px 0 #00000026;
  box-shadow: var(--shadow-btn-close);
}

.card .tool-box {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  top: 0;
  right: 0;
  border-radius: var(--border-radius-main);
}

.deleteCard {
  width: 300px;
  height: 220px;
  background-color: whitesmoke;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  gap: 13px;
  position: relative;
  overflow: hidden;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.062);
}

.cookieHeading {
  font-size: 1.2em;
  font-weight: 800;
  color: rgb(26, 26, 26);
}

.buttonContainer {
  display: flex;
  gap: 20px;
  flex-direction: row;
}

.acceptButton {
  width: 80px;
  height: 30px;
  background-color: #7b57ff;
  transition-duration: .2s;
  border: none;
  color: rgb(241, 241, 241);
  cursor: pointer;
  font-weight: 600;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px #977ef3, 0 2px 4px -1px #977ef3;
  transition: all .6s ease;
}

.declineButton {
  width: 80px;
  height: 30px;
  background-color: #dadada;
  transition-duration: .2s;
  color: rgb(46, 46, 46);
  border: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px #bebdbd, 0 2px 4px -1px #bebdbd;
  transition: all .6s ease;
}

.declineButton:hover {
  background-color: #ebebeb;
  box-shadow: 0 10px 15px -3px #bebdbd, 0 4px 6px -2px #bebdbd;
  transition-duration: .2s;
}

.acceptButton:hover {
  background-color: #9173ff;
  box-shadow: 0 10px 15px -3px #977ef3, 0 4px 6px -2px #977ef3;
  transition-duration: .2s;
}
</style>
