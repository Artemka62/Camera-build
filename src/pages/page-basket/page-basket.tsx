import { CardListBasketComponent } from '../../components/card-list-basket/card-list-basket';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { ModalWindowComponent } from '../../components/modal-window-list/modal-window-list';
import { NavigationInPageComponent } from '../../components/navigation-in-page/navigation-in-page';
import { OrderProductComponent } from '../../components/order-product-component/order-product-component';
import { useDocumentTitle } from '../../use-hooks/use-hook-document-title';


type BasketProps = {
  title: string;
}

function BasketPage ({title}: BasketProps) {
  useDocumentTitle(title);

  return (
    <div className="wrapper" data-testid ='basket-page'>
      <HeaderComponent/>
      <main>
        <div className="page-content">
          <NavigationInPageComponent/>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <CardListBasketComponent/>
              <OrderProductComponent/>
            </div>
          </section>
        </div>
      </main>
      <ModalWindowComponent/>
      <FooterComponent/>
    </div>

  );
}

export {BasketPage};
