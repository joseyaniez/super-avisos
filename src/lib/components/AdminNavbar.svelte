
<script lang="ts">
let { tab = $bindable('nuevo') } = $props();
</script>

<div>
  <div>
    <button onclick={() => tab = 'nuevo'}>Nuevo</button>
    <button onclick={() => {
      console.log('Cambiando a aviso');
      tab = 'aviso';
    }}>Aviso</button>
  </div>
</div>
