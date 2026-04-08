
class NoticeUIState {
  errorMessages = $state<string[]>([]);
  loading = $state(false);
  
  reset() {
    this.errorMessages = [];
    this.loading = false;
  }

}

export const noticeUIState = new NoticeUIState();
