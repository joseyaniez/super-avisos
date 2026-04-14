<script>
  import AdminNavbar from "$lib/components/AdminNavbar.svelte";
    import ListNotice from "./sections/list/ListNotice.svelte";
  import NewNotice from "./sections/new/NewNotice.svelte";

  let tab = $state('nuevo');

</script>

<div class="flex flex-col min-h-screen">
  <AdminNavbar bind:tab={tab}/>
  {#if tab === 'nuevo'}
    <NewNotice/>
  {:else if tab === 'aviso'}
    <ListNotice/>
  {/if}
</div>
