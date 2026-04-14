<script lang="ts">
  import type { NoticeResponse } from "$lib/features/notices/domain/notice.types";

  import { onMount } from "svelte";
  import { loadNotices } from "$lib/features/notices/services/notice.service";
    import Dialog from "$lib/components/Dialog.svelte";

  let notices = $state<NoticeResponse[]>([])
  let errorMessage = $state('');
  let showModal = $state(false);

  onMount(async () => {
    try {
      notices = await loadNotices();
    } catch(err){
      errorMessage = 'Error al cargar los avisos';
    }
  })


</script>

<div class="flex flex-row max-w-full flex-1 bg-slate-100">
  <div class="bg-slate-300 m-2 py-4 px-6 rounded-md w-full">
    <h1 class="text-2xl text-slate-600 font-bold">Avisos publicados</h1>
    {#if errorMessage.length > 0}
      <div class="bg-red-400 text-white p-4 rounded mt-4">
        <p>{errorMessage}</p>
      </div>
    {:else if notices.length > 0}
      <div class="bg-white rounded-t-md my-2 p-4 w-full flex flex-col">
        <div class="flex flex-row gap-4 border-b py-2">
          <div class="w-10">
            <p>ID</p>
          </div>
          <div class="w-25">
            <p>Teléfono</p>
          </div>
          <div class="w-40">
            <p>Categoría</p>
          </div>
          <div class="flex-1">
            <p>Contenido</p>
          </div>
          <div class="w-80">
            <p>Acciones</p>
          </div>
        </div>
        {#each notices as notice}
          <div class="flex flex-row gap-4 border-b py-2">
            <div class="w-10">
              <p>{ notice.id }</p>
            </div>
            <div class="w-25">
              <p>{ notice.publication?.phone ?? '-' }</p>
            </div>
            <div class="w-40">
              <p>{ notice.category.content }</p>
            </div>
            <div class="flex-1">
              <p class="truncate">{ notice.content }</p>
            </div>
            <div class="w-80 flex flex-row gap-2">
              <button class="bg-blue-300 px-4 py-2 rounded">Editar</button>
              <button onclick={() => showModal = true} class="bg-red-300 px-4 py-2 rounded">Eliminar</button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<Dialog bind:showModal>
  <p class="text-xl my-4 text-center">¿Estás seguro de eliminar esta notice?</p>
  <div class="flex flex-row gap-4 justify-center">
    <button class="bg-blue-300 px-4 py-2 rounded" onclick={() => showModal = false}>Confirmar</button>
    <button class="bg-red-300 px-4 py-2 rounded" onclick={() => showModal = false}>Cancelar</button>
  </div>
</Dialog>
