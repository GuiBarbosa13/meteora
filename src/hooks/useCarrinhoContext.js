import { useContext } from "react"
import { CarrinhoContext } from "../Context/CarrinhoContext"

export const useCarrinhoContext = () => {
    const { carrinho, setCarrinho } = useContext(CarrinhoContext);

    function adicionarProduto(novoProduto) {
        const temOProduto = carrinho.some((itemDoCarrinho) => { itemDoCarrinho.id === novoProduto.id });

        if (!temOProduto) {
            novoProduto.quantidade = 1;
            return setCarrinho((carrinhoAnterior) => [
                ...carrinhoAnterior, novoProduto]
            )
        }

        setCarrinho((carrinhoAnterior) => carrinhoAnterior.map((itemDoCarrinho) => {
            if (itemDoCarrinho.id === novoProduto.id) itemDoCarrinho++;
            return itemDoCarrinho
        }))
    };

    function removerProduto (id) {
        const produto = carrinho.find((item) => {item.id === id});
        const eOUltimo = produto.quantidade ===1;
        
        if(eOUltimo){
            return setCarrinho((carrinhoAnterior) => 
            carrinhoAnterior.filter(item => item.id !== id));
        }
        setCarrinho ((carrinhoAnterior) => 
        carrinhoAnterior.map((item) => {
            if(item.id === id) item.quantidade --;
            return item
        }))
    }

    return {carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto
    };
}