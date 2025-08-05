function Header() {
  return (
    <header className="bg-background border-b">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 flex justify-center py-2">
        <p className="text-xs text-muted-foreground">
          Free shipping on orders over $100 | 30-day returns
        </p>
      </div>
    </header>
  );
}
export default Header;
