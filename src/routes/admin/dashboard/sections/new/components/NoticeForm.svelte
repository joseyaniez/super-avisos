<script lang="ts">
  import { categoryState } from "$lib/features/categories/stores/categoryState.svelte";
  import { noticeFormState } from "$lib/features/notices/states/noticeFormState.svelte";
  import { noticeUIState } from "$lib/features/notices/states/noticeUIState.svelte";

  import { onMount } from "svelte";

  const noticeTypes = [
    { id: 1, name: 'Pequeño' },
    { id: 2, name: 'Mediano' },
    { id: 3, name: 'Doble' },
    { id: 4, name: 'Doble con imagen' },
    { id: 5, name: 'Grande' },
    { id: 6, name: 'Solo imagen' },
  ]

  const documentTypes = [
    { id: 1, name: '-' },
    { id: 2, name: 'Factura' },
    { id: 3, name: 'Boleta' },
  ]

  onMount(async () => {
    await categoryState.loadCategories();
  })

  $effect(() => {
    const match = noticeFormState.rawContent.match(/\b\d{9}\b/);
    if(noticeFormState.clientNumber == '' && match){
      noticeFormState.clientNumber = match[0];
    }
  })

  function handleImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      noticeFormState.image = target.files[0];
      if(noticeFormState.imageUrl){
        URL.revokeObjectURL(noticeFormState.imageUrl);
      }
      noticeFormState.imageUrl = URL.createObjectURL(target.files[0]);
    }
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    //noticeFormState.errorMessages.splice(0, noticeFormState.errorMessages.length); // Limpiar errores anteriores
    noticeUIState.errorMessages = noticeFormState.formValidate();
    //const isValidForm = noticeValidate($state.snapshot(noticeFormState), $state.snapshot(noticeContent));
    if(noticeUIState.errorMessages.length === 0){
      //alert('Formulario válido. Enviando datos...');
      noticeFormState.reset();
      // Aquí puedes agregar la lógica para enviar los datos al servidor o realizar otras acciones necesarias.
    }
  }

</script>

<div class="m-2 flex flex-2 flex-col items-center rounded-xl min-w-130 p-4 bg-slate-200 overflow-scroll">

  <h2 class="font-bold text-xl">Crear un nuevo aviso</h2>

  <form action="" class="w-full flex flex-col h-full">

    <!-- Tipo de aviso -->
    <div class="flex flex-row gap-3 my-4">
      <label class="flex-2" for="noticetype">Tipo</label>
      <select bind:value={noticeFormState.noticeType} id="noticetype" class="flex-2 p-1 rounded text-sm border">
        {#each noticeTypes as noticeType}
          <option value={noticeType.name}>{noticeType.name}</option>
        {/each}
      </select>
    </div>

    <!-- Categoría -->
    <div class="flex flex-row gap-3 my-4">
      <label class="flex-2" for="noticetype">Categoría</label>
      <select disabled={categoryState.loading} bind:value={noticeFormState.category}  id="noticetype" class="flex-2 p-1 rounded text-sm border disabled:bg-gray-300 disabled:cursor-progress">
          <option value="" disabled selected> - </option>
        {#each categoryState.categories as category}
          <option value={category.id}>{category.content}</option>
        {/each}
      </select>
    </div>

    <!-- Fecha de expiración -->
    <div class="flex flex-row gap-3 my-4">
      <label class="flex-2" for="clientNumber">Fecha expiración</label>
      <input type="date" bind:value={noticeFormState.expirationDate} id="clientNumber" class="flex-2 p-1 text-sm rounded border"/>
    </div>

    <!-- Contenido del aviso -->
    <div class="flex flex-col gap-2 my-4">
      <label for="noticecontent">Contenido</label>
      <textarea bind:value={noticeFormState.rawContent} class="min-h-50 max-h-100 border rounded-md p-4" id="noticecontent"></textarea>
    </div>

    <!-- Imagen del aviso -->
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

    <!-- Número del cliente -->
    <div class="flex flex-row gap-3 my-4">
      <label class="flex-3" for="clientNumber">Número cliente</label>
      <input type="text" bind:value={noticeFormState.clientNumber} id="clientNumber" class="flex-2 p-1 text-sm rounded border"/>
    </div>

    <!-- Tipo de comprobante -->
    <div class="flex flex-row gap-3 my-4">
      <label for="documentType" class="flex-3">Comprobante</label>
      <select bind:value={noticeFormState.paymentType}  id="noticetype" class="flex-2 p-1 rounded text-sm border">
        {#each documentTypes as doc}
          <option value={doc.name}>{doc.name}</option>
        {/each}
      </select>
    </div>

    <!-- Número de documento (DNI o RUC) -->
    {#if noticeFormState.paymentType == 'Boleta' || noticeFormState.paymentType == 'Factura'}
      <div class="flex flex-row gap-3 my-4">
        <label class="flex-3" for="clientNumber">Número documento</label>
        <input type="text" bind:value={noticeFormState.documentNumber} id="clientNumber" class="flex-2 p-1 text-sm rounded border"/>
      </div>
    {/if}

    <span class="flex-1"></span>

    <div class="">
      <input type="submit" onclick={handleSubmit} class="py-2 w-full rounded-md bg-slate-500 hover:bg-slate-600 font-bold text-white cursor-pointer" value="Guardar aviso"/>
    </div>

  </form>
</div>
