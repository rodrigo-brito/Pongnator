<?php $page = "jogador"; ?>
@include("header")

<div class="container-fluid">

    <div class="row">
        <div class="col-md-12 div-cab">
            <h1><i class="fa fa-user"></i> Jogadores</h1>
            <p>Cadastrar novo jogador.</p>
        </div>
    </div>
    
    @include("jogador.menu")

    <div class="row">
        <div class="col-md-6">

            <div class="well">
                <h3>Cadastrar</h3>

                <form method="POST" action="{{ route("jogador.salvar") }}">
                    <input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}" />
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="nome">Nome</label>
                                <input type="text" class="form-control" id="nome" name="nome" maxlength="32" value="{{ old("nome") }}">
                            </div>
                            <div class="form-group">
                                <label for="avatar">Avatar</label>
                                <div class="radio radio-success">
                                    <?php for ($i = 1; $i <= 5; $i++) { ?>
                                        <label>
                                            <input type="radio" value="{{ $i }}" name="avatar">
                                            <span class="circle"></span>
                                            <span class="check"></span>
                                            <img class="img-circle" src="{{ URL::asset("images/avatar" . $i . ".png") }}" style="width: 50px;">
                                        </label>

                                    <?php } ?>
                                </div>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-raised btn-primary">Salvar</button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>

        </div>
    </div>

</div>

@include("footer")

