<script lang="ts">
  import { noticeContent, noticeFormState } from "$lib/states/noticeFormState.svelte";
  import { parseEditorText, type ParsedText } from "$lib/util/parser/parseContents";
    import BigNoticeView from "./notice-types/BigNoticeView.svelte";
  import DobbleImageNoticeView from "./notice-types/DobbleImageNoticeView.svelte";
  import DobbleNoticeView from "./notice-types/DobbleNoticeView.svelte";
  import MedianNoticeView from "./notice-types/MedianNoticeView.svelte";
  import SimpleNoticeView from "./notice-types/SimpleNoticeView.svelte";

  let noticeContents = $derived(parseEditorText(noticeContent.raw))

  let designTypes = [
    { id: 1, name: 'D' },
    { id: 2, name: 'I' },
  ]

  let minContentTextErrorMessage = $derived.by<string>(() => {
    if(noticeFormState.noticeType === 'Pequeño' && noticeContents.textoNormal.length > 300){
      return "El texto para este tipo de aviso es demasiado largo"
    }
    if(noticeFormState.noticeType === 'Mediano' && noticeContents.textoNormal.length > 400){
      return "El aviso mediano debe tener menos de 300 caracteres de texto normal."
    }
    if(noticeFormState.noticeType === 'Doble' && noticeContents.textoNormal.length > 800){
      return "El aviso doble debe tener menos de 800 caracteres de texto normal."
    }
    if(noticeFormState.noticeType === 'Doble con imagen' && noticeContents.textoNormal.length > 750){
      return "El aviso doble con imagen debe tener menos de 750 caracteres de texto normal."
    }
    if(noticeFormState.noticeType === 'Grande' && noticeContents.textoNormal.length > 1500){
      return "El aviso grande debe tener menos de 1500 caracteres de texto normal."
    }
    return "";
  })

</script>
<div class="flex-3 flex flex-col m-2 p-4 rounded-xl bg-slate-200">
  {#if noticeFormState.noticeType == 'Doble con imagen' || noticeFormState.noticeType == 'Grande'}
    <div class="flex flex-row justify-center gap-2">
      {#each designTypes as design}
        <button 
          onclick={() => noticeContent.designType = design.name}
          class="px-2 py-1 rounded-md w-10 {noticeContent.designType == design.name ? 'bg-sky-400' : 'bg-slate-300'} text-sm"
        >
          {design.name}
        </button>
      {/each}
    </div>
  {/if}
  <div class="flex-1 flex items-center justify-center" style="white-space: pre-line;">
    {#if noticeContent.raw == ''}
      Sin vista previa
    {:else if noticeFormState.noticeType === 'Pequeño'}
      <SimpleNoticeView content={noticeContents.textoNormal}/>
    {:else if noticeFormState.noticeType === 'Mediano'}
      <MedianNoticeView 
        title={noticeContents.titulo} 
        content={noticeContents.textoNormal} 
        postdata={noticeContents.postdata}
      />
    {:else if noticeFormState.noticeType === 'Doble'}
      <DobbleNoticeView 
        title={noticeContents.titulo} 
        content={noticeContents.textoNormal} 
        postdata={noticeContents.postdata}
      />
    {:else if noticeFormState.noticeType === 'Doble con imagen'}
      <DobbleImageNoticeView 
        title={noticeContents.titulo} 
        content={noticeContents.textoNormal} 
        postdata={noticeContents.postdata}
        imageURL={noticeContent.imageUrl}
      />
    {:else if noticeFormState.noticeType === 'Grande'}
      <BigNoticeView 
        title={noticeContents.titulo} 
        content={noticeContents.textoNormal} 
        postdata={noticeContents.postdata}
        imageURL={noticeContent.imageUrl}
      />
    {/if}
  </div>
  {#if minContentTextErrorMessage != ''}
    <div class="flex flex-col">
      <div class="flex flex-row gap-4 rounded-md bg-red-400 text-white font-bold py-2 px-4 w-1/3">
        <p>!</p>
        <p>{minContentTextErrorMessage}</p>
      </div>
    </div>
  {/if}
</div>
