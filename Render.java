import javafx.application.Application;
import javafx.collections.ObservableList;
import javafx.scene.Group;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;
import javafx.stage.Stage;


/**
 * Created by firefly on 4/10/17.
 */
public class Render extends Application{
    private Stage stage;
    private GraphicsContext gc;
    private int width = 400;
    private int height = 400;
    private int i = 0;

    public static void main(String args){
        launch(args);
    }

    public void start(Stage theStage){
        initUI(theStage);
    }

    private void initUI(Stage theStage){
        stage = theStage;
        stage.setTitle("AI War");
        Group root = new Group();
        Scene gameScene = new Scene(root);
        stage.setScene(gameScene);

        Canvas gameCanvas = new Canvas(width, height);

        ObservableList<Node> rootChildren = root.getChildren();
        rootChildren.add(gameCanvas);

        gc = gameCanvas.getGraphicsContext2D();
        //gc.setFill(Color.BLACK);


        Update updater = new Update();
        Render renderer = new Render();
        gameLoop<Update, Render> gl;
        gl = new gameLoop(updater, renderer);

        gl.updater.update(1);

        gl.setUpdater(updater);
        gl.setRenderer(renderer);

        gl.start();

        stage.show();
    }

     public void render(){
        gc.setFill(Color.WHITE);
        gc.fillRect(0,0, width, height);
        gc.setFill(Color.BLACK);
        gc.fillRect(i,10, 10,10);
    }
}
