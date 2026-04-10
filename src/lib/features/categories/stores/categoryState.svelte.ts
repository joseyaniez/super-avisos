
class CategoryState {
  categories = $state<{ id: number; content: string }[]>([]);
  loading = $state(true);

  async loadCategories() {
    // Simulate loading categories from an API or database
    const response = await fetch('http://localhost:3000/categories');
    if (response.ok) {
      const data = await response.json();
      this.categories = data;
    } else {
      console.error(`Failed to load categories: ${response.status} ${response.statusText}`);
    }
   
    this.loading = false;
  }

}

export const categoryState = new CategoryState();
