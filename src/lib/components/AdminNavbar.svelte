
<script lang="ts">
let { tab = $bindable('nuevo') } = $props();
</script>

<div class="bg-red-300">
  <div>
    <button onclick={() => tab = 'nuevo'}>Nuevo</button>
    <button onclick={() => tab = 'aviso'}>Aviso</button>
  </div>
</div>
