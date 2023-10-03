import { Delete, Edit, Image } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Button,
	Divider,
	FormControl,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { v4 as randomUUID } from 'uuid';
import { Main } from '../components/Main';
import { Paper } from '../components/Paper';
import { Title } from '../components/Title';

interface Produto {
	id: string;
	nome: string;
	preco: number;
	quantidade: number;
}

const formater = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function Home() {
	const [produtos, setProdutos] = useState<Produto[]>([]);
	const [totalEstoque, setTotalEstoque] = useState<number>(0);

	useEffect(() => {
		let soma = 0;

		produtos.forEach((produto) => {
			soma += produto.preco * produto.quantidade;
		});

		setTotalEstoque(soma);
	}, [produtos]);

	function cadastrar(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		// 1 - Componente visual ✅
		// 2 - Definicao da Função ✅
		// 3 - Captura os valores dos campos ✅
		// 4 - Garantir o preenchimento de todos os campos ✅
		// 5 - Adicionar o novo produto na lista de produtos ✅

		const novoProduto: Produto = {
			id: randomUUID(),
			nome: event.currentTarget.nome.value,
			preco: Number(event.currentTarget.preco.value),
			quantidade: Number(event.currentTarget.quantidade.value),
		};

		// produtosMock.unshif(novoProduto);
		setProdutos((prevState) => {
			return [novoProduto, ...prevState];
		});

		event.currentTarget.nome.value = '';
		event.currentTarget.preco.value = '';
		event.currentTarget.quantidade.value = '';
	}

	function editar(produto: Produto) {
		const novoNome = prompt('Novo nome: ');
		const novoPreco = prompt('Novo preço: ');
		const novaQuantidade = prompt('Nova Quantidade');

		const produtoAtualizado = {
			id: produto.id,
			nome: novoNome || produto.nome,
			preco: Number(novoPreco) || produto.preco,
			quantidade: Number(novaQuantidade) || produto.quantidade,
		};

		// ATUALIZACAO E EXCLUSÃO SE FAZ ATRAVÉS DO INDICE
		const copiaDeProdutos = [...produtos];
		const indice = copiaDeProdutos.findIndex((p) => p.id === produto.id);
		copiaDeProdutos[indice] = produtoAtualizado;

		setProdutos(copiaDeProdutos); // ADICIONAR / ATUALIZAR / EXCLUIR
	}

	function excluir(produto: Produto) {
		if (confirm(`Tem certeza que deseja excluir o produto ${produto.nome}?`)) {
			// splice - REMOVE UM ITEM - indice
			const copiaDeProdutos = [...produtos];
			const indice = copiaDeProdutos.findIndex((p) => p.id === produto.id);

			const [itemExcluido] = copiaDeProdutos.splice(indice, 1);
			console.log(itemExcluido);

			setProdutos(copiaDeProdutos);
		}
	}

	return (
		<Main>
			<Paper>
				<Title>Controle de Produtos</Title>

				{/*  BOX FORMULARIO */}
				<Box
					component='div'
					marginY={5}
				>
					<FormControl
						fullWidth
						component='form'
						onSubmit={(ev) => cadastrar(ev)}
					>
						<Stack
							spacing={2}
							direction='row'
						>
							<TextField
								id='nome'
								label='Nome'
								type='text'
								required
								variant='outlined'
								sx={{ width: '50%' }}
							/>
							<TextField
								id='preco'
								label='Preço'
								type='number'
								inputProps={{
									step: 0.01,
									min: 0,
								}}
								required
								variant='outlined'
							/>
							<TextField
								id='quantidade'
								label='Quantidade'
								type='number'
								required
								inputProps={{
									step: 1,
									min: 0,
								}}
								variant='outlined'
							/>

							<Button
								type='submit'
								variant='contained'
								color='success'
								sx={{ minWidth: '170px' }}
							>
								Cadastrar
							</Button>
						</Stack>
					</FormControl>
				</Box>

				<Divider />

				<Typography
					marginTop={5}
					variant='h4'
				>
					TOTAL EM ESTOQUE: {formater.format(totalEstoque)}
				</Typography>

				{/* BOX LISTA DADOS */}
				<Box
					component='div'
					marginY={5}
				>
					<List
						component='ul'
						sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
					>
						{produtos.map((produto) => (
							<ListItem
								component='li'
								key={produto.id}
							>
								<ListItemAvatar>
									<Avatar>
										<Image />
									</Avatar>
								</ListItemAvatar>

								<ListItemText
									primary={produto.nome}
									secondary={
										<>
											<Typography>Preço: {formater.format(produto.preco)}</Typography>
											<Typography>Quantidade: {produto.quantidade}</Typography>
										</>
									}
								/>
								<Stack
									spacing={2}
									direction='row'
								>
									<IconButton
										aria-label='update'
										color='info'
										onClick={() => {
											editar(produto);
										}}
									>
										<Edit />
									</IconButton>

									<IconButton
										aria-label='delete'
										color='error'
										onClick={() => excluir(produto)}
									>
										<Delete />
									</IconButton>
								</Stack>
							</ListItem>
						))}
					</List>
				</Box>
			</Paper>
		</Main>
	);
}
