import { onMounted, ref, watch } from 'vue';
import type { Note } from '@/interfaces/Note';

export function useNotes() {
  let showModal = ref(false);
  let newNote = ref('');
  let errorMsg = ref('');
  let showDeleteModal = ref(false);
  let confirmDelete = ref(false);
  let notes = ref<Note[]>([]);

  // 组件挂载时从localStorage中获取数据
  onMounted(() => {
    const notesFromLocalStorage = localStorage.getItem('notes');
    if (notesFromLocalStorage) {
      notes.value = JSON.parse(notesFromLocalStorage);
    }
  });

  function addNote() {
    if (newNote.value.length < 5) {
      return errorMsg.value = 'Note must be at least 5 characters long';
    }
    notes.value.push({
      id: Math.floor(Math.random() * 100000000),
      content: newNote.value,
      date: formatDate(new Date()),
      backgroundColor: getLightRandomColor()
    });
    // 将数据存储到localStorage中
    localStorage.setItem('notes', JSON.stringify(notes.value));

    errorMsg.value = '';
    // 清空输入框
    newNote.value = '';
    // 关闭Modal
    showModal.value = false;
  }

  function removeNote(id: number) {
    showDeleteModal.value = true;
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
  }

  // 监听输入框内容
  watch(newNote, (newNote) => {
    console.log(newNote);
    if (newNote.length >= 5) {
      errorMsg.value = ''; // 使用 errorMsg.value 来修改变量的值
    }
  });

  return {
    showModal,
    newNote,
    errorMsg,
    showDeleteModal,
    confirmDelete,
    notes,
    addNote,
    removeNote
  };
}