var table;
var replies_table;
$(document).ready(function () {
    table = $('#candidates-datatable').DataTable({
        responsive: true,
        data: itens,
        columns: [
            { data: 'id', defaultContent: "N.I" },
            { data: 'fullName', defaultContent: "N.I" },
            { data: 'email', defaultContent: "N.I" },
            { data: 'cellPhone', defaultContent: "N.I" },
            { data: 'linkedIn', defaultContent: "N.I" },
            { data: 'repositoryHub', defaultContent: "N.I" },
            { data: 'description', defaultContent: "N.I" },
            { data: 'phase', defaultContent: "N.I" },
            { data: 'reply', defaultContent: "N.I" },
        ],
    });
    initializeRepliesDataTable(null);
    $(document).on('click', 'button.btn-primary',function() {
        viewReplyHistory(table.row(this).data().id);
    });
});

function initializeRepliesDataTable(data) {
    var config = {
        columns: [
            { data: 'id', defaultContent: "N.I" },
            { data: 'url', defaultContent: "N.I" },
            { data: 'description', defaultContent: "N.I" },
        ],
        autoWidth: true
    };
    if(replies_table != 'undefined') {
        $('#replies-datatable').DataTable().clear().destroy();
    }
    if(data != null) {
        config.data = data;
    }
    replies_table = $('#replies-datatable').DataTable(config);
}

function viewReplyHistory(candidateId) {
    $.ajax({
        type: 'GET',
        url: '/Replies/Candidate',
        data: { candidateId },
        // processData: false,
        datatype : "application/json",
        // contentType: "text/plain",
        success: function (retorno) {
            initializeRepliesDataTable(retorno);
            $("#replies-modal").modal('show');
            // replies_table.columns.adjust();

            console.log(retorno)
        },
    })
    
}