<div class="m-2 flex flex-col items-center rounded-xl min-w-100 p-4 bg-slate-200">
  <h2 class="font-bold text-xl">Crear un nuevo formulario</h2>
  <form action="" class="w-full flex flex-col h-full">
    <div class="flex flex-col gap-2 my-4">
      <label for="imagecontent">Imagen</label>
      <input class="bg-slate-300 p-2 rounded text-sm" type="file">
    </div>
    <div class="flex flex-col gap-2 my-4">
      <label for="noticecontent">Contenido</label>
      <textarea class="min-h-50 max-h-100 border rounded-md p-4" id="noticecontent"></textarea>
    </div>
    <span class="flex-1"></span>
    <div class="flex flex-row gap-4 justify-end">
      <input type="submit" class="py-1 px-2 rounded bg-slate-300 cursor-pointer" value="Guardar aviso"/>
    </div>
  </form>
</div>
