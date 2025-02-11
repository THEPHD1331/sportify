namespace MyWebApi
{
    public class ApiResponse
{
        public String message { get; set; }
        public Object data { get; set; }

        public ApiResponse(string message, object data)
        {
            this.message = message;
            this.data = data;
        }
        public ApiResponse() { }

        public override string? ToString()
        {
            return base.ToString();
        }
    }
}
