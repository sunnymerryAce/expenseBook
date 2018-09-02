<template lang="pug">
  <nav>
    <div class="nav-wrapper">
      <router-link to='/'>Expense Book</router-link>
      <ul class="right">
        <li>
          <router-link to="list">
            <i class="material-icons">format_list_bulleted
            </i>
          </router-link>
        </li>
        <li><a href="mobile.html"><i class="material-icons">settings</i></a></li>
      </ul>
    </div>
  </nav>
</template>

<style>
.title {
  left: 35%;
  font-size: 1.5rem;
}
</style>

