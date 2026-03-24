<script>
  import AdminNavbar from "$lib/components/AdminNavbar.svelte";

  let tab = $state('nuevo');

</script>

<AdminNavbar bind:tab={tab}/>

{#if tab === 'nuevo'}
  <p>Esta es la sección para crear nuevo aviso</p>
{:else if tab === 'aviso'}
  <p>Esta es la sección para ver los avisos</p>
{/if}
