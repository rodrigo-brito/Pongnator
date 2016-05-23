<section id="messages">
    @if (session('status'))
    <div class="alert alert-success alert-dismissable">
        <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
        <h4>
            <i class="icon fa fa-check"></i> 
            Sucesso!
        </h4>
        {{ session('status') }}
    </div>
    @endif

    @if (count($errors) > 0)
    <div class="alert alert-danger alert-dismissable">
        <button class="close" aria-hidden="true" data-dismiss="alert" type="button">×</button>
        <h4>
            <i class="icon fa fa-ban"></i>
            Falha!
        </h4>
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
</section>