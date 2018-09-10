<template lang="pug">
  <nav>
    <div class="nav-wrapper light-blue">
      <router-link to='/' class='title'>Expense Book</router-link>
      <ul class="right">
        <li>
          <router-link to="list">
            <i class="material-icons">format_list_bulleted
            </i>
          </router-link>
        </li>
        <li>
          <router-link to="setting">
            <i class="material-icons">settings
            </i>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style>
.title {
  left: 35%;
  font-size: 1.5rem;
}
.nav-wrapper {
  text-align: center;
}
.title {
  font-size: 24px;
}
</style>

