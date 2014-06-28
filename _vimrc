set nocompatible
"source $VIMRUNTIME/vimrc_example.vim
"source $VIMRUNTIME/mswin.vim
behave mswin
let mapleader = '\'


call pathogen#infect()

set diffexpr=MyDiff()
function! MyDiff()
  let opt = '-a --binary '
  if &diffopt =~ 'icase' | let opt = opt . '-i ' | endif
  if &diffopt =~ 'iwhite' | let opt = opt . '-b ' | endif
  let arg1 = v:fname_in
  if arg1 =~ ' ' | let arg1 = '"' . arg1 . '"' | endif
  let arg2 = v:fname_new
  if arg2 =~ ' ' | let arg2 = '"' . arg2 . '"' | endif
  let arg3 = v:fname_out
  if arg3 =~ ' ' | let arg3 = '"' . arg3 . '"' | endif
  let eq = ''
  if $VIMRUNTIME =~ ' '
    if &sh =~ '\<cmd'
      let cmd = '""' . $VIMRUNTIME . '\diff"'
      let eq = '"'
    else
      let cmd = substitute($VIMRUNTIME, ' ', '" ', '') . '\diff"'
    endif
  else
    let cmd = $VIMRUNTIME . '\diff'
  endif
  silent execute '!' . cmd . ' ' . opt . arg1 . ' ' . arg2 . ' > ' . arg3 . eq
endfunction


let g:syntastic_check_on_open=1
let g:bufExplorerShowRelativePath=1
set number
set autoindent

set fileencoding=utf-8
set encoding=utf-8

set gdefault

set incsearch
set ignorecase 
set hlsearch 
set smartcase

set showmatch
set backspace=indent,eol,start
set winheight=5
set winminheight=5
set winheight=1999

set winwidth=130

set list
set listchars=tab:▸,,eol:¬

set noswapfile
set visualbell
set expandtab
set tabstop=4
set softtabstop=4
set shiftwidth=4

filetype plugin indent on

set statusline=%f\ \ line:%l/%L\ \ col:%c

"set guifont=Consolas:h10:cANSI

set encoding=utf-8
set guifont=Powerline_Consolas:h9

set cc=80


syntax on

set background=dark
color  desert


"hi CursorLine term=bold cterm=bold ctermbg=white ctermfg=white guibg=darkred guifg=white
"hi CursorColumn term=bold cterm=bold ctermbg=white ctermfg=white guibg=darkred guifg=white


nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>

set splitbelow
set splitright




nnoremap<Leader>c :set cursorline! cursorcolumn! <CR>

nnoremap ; :
nnoremap : ;

"autocmd VimEnter * NERDTree
nnoremap <leader>n :NERDTreeToggle<CR>
nnoremap <leader>f :NERDTreeFocus<CR>

let g:NERDTreeWinSize=40

set t_Co=256

set errorformat=\ %#%f(%l\\\,%c):\ %m
set makeprg=C:\\windows\\microsoft.net\\framework\\v4.0.30319\\msbuild.exe\ /nologo\ /v:q\ /property:GenerateFullPaths=true 

let jshint2_save=1
let jshint2_read=0 
nnoremap<silent><F5> :JSHint<CR>
inoremap<silent><F5> <C-O>:JSHint<CR>
vnoremap<silent><F5> :JSHint<CR>

nnoremap<silent><F4> :lnext<CR>
inoremap<silent><F4> <C-O>:lnext<CR>
vnoremap<silent><F4> :lnext<CR>

nnoremap<silent><F6> :lprevious<CR>
inoremap<silent><F6> <C-O>:lprevious<CR>
vnoremap<silent><F6> :lprevious<CR>

let g:indent_guides_guide_size=1

cd /devshop/

let g:ctrlp_max_files = 0
let g:ctrlp_working_path_mode = 0

set wildignore+=*/out/**
set wildignore+=*/vendor/**

let g:airline_powerline_fonts = 1
let g:airline#extensions#tabline#enabled = 1

set laststatus=2

let NERDTreeHijackNetrw=1
