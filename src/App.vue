<script setup lang="ts">

</script>

<template>
    <main>
        <div class="container">
          <header>
            <h1>Notes</h1>
            <button>+</button>
          </header>
           <div class="card-container">
                <div class="card">
                  <p class="main-text"></p>
                  <p class="date"></p>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>

main{
  height: 100vh;
  width: 100vw;
}
.container{
max-width: 1000px;
padding: 10px;
margin: 0 auto;
}
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
