<script lang="ts">

  import { noticeFormState, noticeContent } from "$lib/states/noticeFormState.svelte";

  const noticeTypes = [
    { id: 1, name: 'Pequeño' },
    { id: 2, name: 'Mediano' },
    { id: 3, name: 'Doble' },
    { id: 4, name: 'Doble con imagen' },
    { id: 5, name: 'Grande' },
    { id: 6, name: 'Solo imagen' },
  ]

  const categories = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Eventos' },
    { id: 3, name: 'Ofertas' },
    { id: 4, name: 'Noticias' },
    { id: 5, name: 'Otros' },
  ]

  function handleImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      noticeFormState.image = target.files[0];
      if(noticeContent.imageUrl){
        URL.revokeObjectURL(noticeContent.imageUrl);
      }
      noticeContent.imageUrl = URL.createObjectURL(target.files[0]);
    }
  }

</script>

<div class="m-2 flex flex-col items-center rounded-xl min-w-130 p-4 bg-slate-200">
  <h2 class="font-bold text-xl">Crear un nuevo aviso</h2>
  <form action="" class="w-full flex flex-col h-full">
    <div class="flex flex-row gap-3 my-4">
      <label class="flex-1" for="noticetype">Tipo</label>
      <select bind:value={noticeFormState.noticeType} id="noticetype" class="flex-2 p-1 rounded text-sm border">
        {#each noticeTypes as noticeType}
          <option value={noticeType.name}>{noticeType.name}</option>
        {/each}
      </select>
    </div>
    <div class="flex flex-row gap-3 my-4">
      <label class="flex-1" for="noticetype">Categoría</label>
      <select bind:value={noticeFormState.category}  id="noticetype" class="flex-2 p-1 rounded text-sm border">
        {#each categories as category}
          <option value={category.name}>{category.name}</option>
        {/each}
      </select>
    </div>
    <div class="flex flex-col gap-2 my-4">
      <label for="noticecontent">Contenido</label>
      <textarea bind:value={noticeContent.raw} class="min-h-50 max-h-100 border rounded-md p-4" id="noticecontent"></textarea>
    </div>
    {#if 
      noticeFormState.noticeType === 'Doble con imagen' || 
      noticeFormState.noticeType === 'Solo imagen' || 
      noticeFormState.noticeType === 'Grande'
    }
      <div class="flex flex-col gap-2 my-4">
        <label for="imagecontent">Imagen</label>
        <input class="bg-slate-300 p-2 rounded text-sm" type="file" onchange={handleImageChange}>
      </div>
    {/if}
    <span class="flex-1"></span>
    <div class="flex flex-row gap-4 justify-end">
      <input type="submit" class="py-1 px-2 rounded bg-slate-300 cursor-pointer" value="Guardar aviso"/>
    </div>
  </form>
</div>
