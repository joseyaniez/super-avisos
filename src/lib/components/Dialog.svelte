<script>
  let { showModal = $bindable(), children } = $props();
  let dialog = $state();

  $effect(() => {
    if (!dialog) return;

    if (showModal) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  });
</script>

<dialog
  bind:this={dialog}
  class="rounded-lg border-none m-auto min-w-lg max-w-3/4 lg:max-w-2/3"
  onclose={() => {
    if (showModal) showModal = false;
  }}
  oncancel={(_) => {
    showModal = false;
  }}
  onclick={(e) => {
    if (e.target === dialog) dialog.close();
  }}
>
  <div class="px-10 py-4">
    {@render children?.()}
  </div>
</dialog>
